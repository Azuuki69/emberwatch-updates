# Emberwatch downloads

The game's source code is private. This repository hosts compiled downloads, signed game updates and a public Mac build scaffold.

## Android

[Download the latest Android APK](https://github.com/Azuuki69/emberwatch-updates/releases/latest/download/Emberwatch-Android-alpha.apk) and open it on an Android phone.

## iPhone / iPad

[Download Emberwatch-iOS-unsigned.ipa](https://github.com/Azuuki69/emberwatch-updates/releases/download/ios-test/Emberwatch-iOS-unsigned.ipa). This compiled test package needs signing with the tester's own Apple account before installation, for example using AltStore Classic on a Windows PC or Mac. A free account needs its signature refreshed every seven days. Game auto-updates do not renew that Apple signature.

[iPhone installation guide](https://github.com/Azuuki69/emberwatch-updates/releases/download/ios-test/iPhone-testing.md) · [All iOS test files and simulator preview](https://github.com/Azuuki69/emberwatch-updates/releases/tag/ios-test)

Built with Xcode 26.6. An iPhone simulator XCTest passed welcome, simulation, landmark claim and settlement management. Physical iPhone signing and gameplay still need the tester's check. This is not an App Store or TestFlight build.

## Automatic game updates

Installed compatible apps check a signed update manifest on launch, foreground and every five minutes while open. Updates apply after background/reopen. The ZIP and manifest are used by the app and are not manual installers. New native capabilities require a new APK or signed iPhone binary.

Only the app's pinned signing key can authorize game updates. No GitHub access token or private signing key is included in either app or this repository.
