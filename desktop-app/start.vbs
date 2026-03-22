Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(WScript.ScriptFullName)

cmd = """" & root & "\node_modules\.bin\electron.cmd"" """ & root & """"
shell.Run cmd, 0, False
