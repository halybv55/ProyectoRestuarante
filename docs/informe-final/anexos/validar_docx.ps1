$ErrorActionPreference = "Stop"

$docxPath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..\Informe_Final_Proyecto_Restaurante.docx")).Path
$word = $null
$document = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $document = $word.Documents.Open($docxPath, $false, $true)

    [pscustomobject]@{
        Opened = $true
        Pages = $document.ComputeStatistics(2)
        Words = $document.ComputeStatistics(0)
        Tables = $document.Tables.Count
        InlineShapes = $document.InlineShapes.Count
        TocFields = $document.TablesOfContents.Count
    }
}
finally {
    if ($null -ne $document) {
        $document.Close($false)
    }
    if ($null -ne $word) {
        $word.Quit()
    }
}
