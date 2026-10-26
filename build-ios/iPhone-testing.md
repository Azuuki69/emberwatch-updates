# Emberwatch for iPhone — testing package

Download **Emberwatch-iOS-unsigned.ipa**. This is a compiled iPhone app, but it needs signing with the tester's own Apple account before it can run on a physical iPhone. It is not an App Store or TestFlight download. Do not try to install the Android APK on an iPhone.

## Free personal testing with a computer

1. Install AltStore Classic / AltServer using its official guide: https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows (Windows) or https://faq.altstore.io/altstore-classic/how-to-install-altstore-macos (Mac).
2. Connect and trust your iPhone, set up AltStore with **your own Apple account**, and enable Developer Mode if iOS requests it. Enter account credentials only into the signing tool on your computer, never into Emberwatch or a chat.
3. Save `Emberwatch-iOS-unsigned.ipa` in Files on the iPhone, then import it using the + button in AltStore's My Apps tab. AltStore signs the package for your device and installs it.
4. Launch Emberwatch and choose the simulated expedition first. Location permission is optional until you try real-world exploration.

Free-account signing expires after seven days and must be refreshed with AltStore/AltServer. Refreshing the Apple signature is separate from game auto-updates: downloading a new game bundle does **not** renew the Apple signature. Apple account/device limits apply.

The iOS package was built on a GitHub-hosted Mac and launched in an iPhone simulator. Physical iPhone signing and gameplay have not been tested by the developer; please report signing errors or crashes with the iOS version and device model.

## Other downloads

- `Emberwatch-iOS-Simulator-Mac-only.zip`: a simulator app for developers using a Mac and Xcode; it cannot run on an actual iPhone.
- `Emberwatch-iOS-simulator-preview.png`: screenshot captured from the launched simulator.
- The game-update ZIP and `manifest.json` are downloaded automatically by compatible installed apps, not manual installers.

No paid Apple membership is needed for the personal sideloading route above. A straightforward TestFlight invitation would require a developer membership and signed distribution build, which have not been configured.
