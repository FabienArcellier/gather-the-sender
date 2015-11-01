# Overview #
You will find scripts to build the extension to test it or to release it in the directory `scripts\build\`.
The build operation will make an xpi package you can install in Thunderbird.

| **Name** | **Directory** | **Description** | **Implementation** |
|:---------|:--------------|:----------------|:-------------------|
| Phing    | scripts\build\phing | Phing is a build tool develop in PHP compatible with Windows and linux (due to the use of 7-zip) | Done               |
| Batch    | scripts\build\batch | Batch implementation for windows to build Gather the sender | Todo               |
| Shell    | scripts\build\sh | Shell implementation for linux to build Gather the sender | Todo               |

# Preprocessing #

The build scripts have to replace the variable that begins with {$ and ends by } by a value.

# Code validation #

To improve the code quality, all the javascript code is tested with [Jslint](http://www.jslint.com/) when you build a test version.

# Tasks summary #

Each implementation has to execute those tasks.

| **Task** | **Description** | **Phing** |
|:---------|:----------------|:----------|
| release  |{$DEBUG} is set at false | Done      |
| debug    | {$DEUBG} is set at true | Done      |
| update   | Update changes from the repository to your working copy | Done      |
| commit   | Commit your working copy to the repository.<br /> _Calls the task update first_. | Done      |

## variables summary ##
Variable a build script have to content. If there are one file by task, use a header file that contains those variables.

| **Name** | **Description** |
|:---------|:----------------|
| VERSION  | Version of the extension we build |
| APP\_PATH | Path of the extension code. Normaly, you don't have to change the value of this variable. |
| RELEASE\_PATH | Output directory where we will store the XPI package that represents a release |
| DEBUG\_PATH | Output directory where we will store the XPI package that represents a debug version|


## release ##

Build a release for Gather the sender.
Package an XPI file in the directory set in RELEASE\_PATH
Set the debug mode to false.

```
# use phing with release profil in command prompt
phing release
```

## debug ##

Build a debug release to test Gather the sender.
Package an XPI file in the directory set in DEBUG\_PATH
Set the debug mode to true.

```
# use phing with debug profil in command prompt
phing debug
```