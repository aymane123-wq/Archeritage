$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDirectory = Join-Path $PSScriptRoot '..\content-source'
$outputPath = Join-Path $PSScriptRoot '..\src\content\official\documents.json'
$wordNamespace = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
$documents = [ordered]@{}

Get-ChildItem -LiteralPath $sourceDirectory -Filter '*.docx' | Sort-Object Name | ForEach-Object {
  $archive = [System.IO.Compression.ZipFile]::OpenRead($_.FullName)

  try {
    $entry = $archive.GetEntry('word/document.xml')
    $reader = [System.IO.StreamReader]::new($entry.Open())

    try {
      [xml]$xml = $reader.ReadToEnd()
    }
    finally {
      $reader.Dispose()
    }

    $namespaceManager = [System.Xml.XmlNamespaceManager]::new($xml.NameTable)
    $namespaceManager.AddNamespace('w', $wordNamespace)
    $paragraphs = @()

    foreach ($paragraph in $xml.SelectNodes('//w:body//w:p', $namespaceManager)) {
      $textParts = foreach ($node in $paragraph.SelectNodes('.//w:t | .//w:tab | .//w:br', $namespaceManager)) {
        if ($node.LocalName -eq 'tab') { "`t" }
        elseif ($node.LocalName -eq 'br') { "`n" }
        else { $node.InnerText }
      }

      $text = $textParts -join ''

      if (-not [string]::IsNullOrWhiteSpace($text)) {
        $paragraphs += [ordered]@{
          text = $text
          list = $null -ne $paragraph.SelectSingleNode('./w:pPr/w:numPr', $namespaceManager)
        }
      }
    }

    $documentLabel = $paragraphs[0].text
    $key = switch -Regex ($documentLabel) {
      'Cabinet' { 'cabinet' }
      'Missions' { 'missions' }
      'Expertises' { 'expertises' }
      '^M.thode$' { 'methode' }
      '^R.f.rences$' { 'references' }
      'Journal' { 'journal' }
      'Contact' { 'contact' }
      default { throw "Unknown official document: $documentLabel" }
    }

    $documents[$key] = $paragraphs
  }
  finally {
    $archive.Dispose()
  }
}

$outputDirectory = Split-Path -Parent $outputPath
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$json = $documents | ConvertTo-Json -Depth 6
[System.IO.File]::WriteAllText($outputPath, $json, [System.Text.UTF8Encoding]::new($false))

Write-Output "Extracted $($documents.Count) official documents to $outputPath"
