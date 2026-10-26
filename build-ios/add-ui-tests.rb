require 'xcodeproj'
require 'fileutils'
project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
app = project.targets.find { |t| t.name == 'App' }
target = project.new_target(:ui_test_bundle, 'EmberwatchUITests', :ios, '15.0', nil, :swift)
target.add_dependency(app)
project.root_object.attributes['TargetAttributes'] ||= {}
project.root_object.attributes['TargetAttributes'][target.uuid] = {'TestTargetID' => app.uuid}
target.build_configurations.each do |config|
  config.build_settings['GENERATE_INFOPLIST_FILE'] = 'YES'
  config.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'com.emberwatch.game.uitests'
  config.build_settings['TEST_TARGET_NAME'] = 'App'
  config.build_settings['SWIFT_VERSION'] = '5.0'
  config.build_settings['CODE_SIGN_STYLE'] = 'Automatic'
end
FileUtils.mkdir_p('ios/App/EmberwatchUITests')
FileUtils.cp('build-ios/EmberwatchUITests.swift', 'ios/App/EmberwatchUITests/EmberwatchUITests.swift')
group = project.main_group.new_group('EmberwatchUITests', 'EmberwatchUITests')
target.source_build_phase.add_file_reference(group.new_file('EmberwatchUITests.swift'))
project.save
scheme = Xcodeproj::XCScheme.new
scheme.configure_with_targets(app, target, launch_target: true)
scheme.save_as('ios/App/App.xcodeproj', 'EmberwatchValidation', true)
