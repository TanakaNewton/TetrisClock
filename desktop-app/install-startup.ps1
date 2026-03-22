$startup = [Environment]::GetFolderPath("Startup")
$target = Join-Path $PSScriptRoot "start.bat"
$shortcut = Join-Path $startup "TetrisClock.lnk"

$shell = New-Object -ComObject WScript.Shell
$lnk = $shell.CreateShortcut($shortcut)
$lnk.TargetPath = $target
$lnk.WorkingDirectory = $PSScriptRoot
$lnk.WindowStyle = 7
$lnk.Description = "Tetris Clock"
$lnk.Save()

Write-Output "Startup shortcut created: $shortcut"
