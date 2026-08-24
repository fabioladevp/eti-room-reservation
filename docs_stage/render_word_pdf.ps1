param(
    [Parameter(Mandatory = $true)][string]$DocxPath,
    [Parameter(Mandatory = $true)][string]$PdfPath
)

$resolvedDocx = (Resolve-Path -LiteralPath $DocxPath).Path
$resolvedPdf = [System.IO.Path]::GetFullPath($PdfPath)
$pdfDirectory = [System.IO.Path]::GetDirectoryName($resolvedPdf)
if (-not (Test-Path -LiteralPath $pdfDirectory)) {
    New-Item -ItemType Directory -Path $pdfDirectory | Out-Null
}

$word = $null
$document = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $document = $word.Documents.Open($resolvedDocx, $false, $true)
    $document.ExportAsFixedFormat($resolvedPdf, 17)
}
finally {
    if ($null -ne $document) { $document.Close($false) }
    if ($null -ne $word) { $word.Quit() }
}

Write-Output $resolvedPdf
