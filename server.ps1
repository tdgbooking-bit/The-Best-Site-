$path = "C:\Users\kmack\OneDrive\Desktop\clothing-brand-website"
$port = 3002
$url = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()
Write-Host "Listening on $url"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestUrl = $context.Request.Url
    $localPath = $requestUrl.LocalPath
    $filePath = Join-Path $path $localPath
    if ($localPath -eq "/") {
        $filePath = Join-Path $path "enter-landing\index.html"
    }
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding Byte
        $response = $context.Response
        $response.ContentLength64 = $content.Length
        $response.ContentType = if ($filePath.EndsWith(".html")) { "text/html" } elseif ($filePath.EndsWith(".css")) { "text/css" } elseif ($filePath.EndsWith(".js")) { "application/javascript" } elseif ($filePath.EndsWith(".mp4")) { "video/mp4" } else { "application/octet-stream" }
        $response.OutputStream.Write($content, 0, $content.Length)
        $response.OutputStream.Close()
    } else {
        $context.Response.StatusCode = 404
        $context.Response.OutputStream.Close()
    }
}