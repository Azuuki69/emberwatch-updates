import XCTest

final class EmberwatchUITests: XCTestCase {
    func testWelcomeAndClaim() throws {
        continueAfterFailure = false
        let app = XCUIApplication(bundleIdentifier: "com.emberwatch.game")
        app.launch()
        let start = app.webViews.buttons["Try the simulated expedition"]
        XCTAssertTrue(start.waitForExistence(timeout: 90), "The actual game welcome screen must load. UI: \(app.debugDescription)")
        let welcome = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        welcome.name = "Emberwatch-iOS-welcome"
        welcome.lifetime = .keepAlways
        add(welcome)
        start.tap()
        let landmark = app.webViews.buttons.matching(NSPredicate(format: "label CONTAINS %@", "The Lantern Gardens")).firstMatch
        XCTAssertTrue(landmark.waitForExistence(timeout: 30))
        for _ in 0..<5 {
            if landmark.isHittable { break }
            app.swipeUp()
        }
        landmark.tap()
        let claim = app.webViews.buttons["Raise your banner"]
        XCTAssertTrue(claim.waitForExistence(timeout: 15))
        for _ in 0..<5 {
            if claim.isHittable { break }
            app.swipeUp()
        }
        claim.tap()
        let settlements = app.webViews.buttons.matching(NSPredicate(format: "label CONTAINS %@", "Settlements")).firstMatch
        XCTAssertTrue(settlements.waitForExistence(timeout: 15))
        settlements.tap()
        XCTAssertTrue(app.webViews.staticTexts["The Lantern Gardens"].waitForExistence(timeout: 15))
        let settlement = XCTAttachment(screenshot: XCUIScreen.main.screenshot())
        settlement.name = "Emberwatch-iOS-settlement"
        settlement.lifetime = .keepAlways
        add(settlement)
    }
}
