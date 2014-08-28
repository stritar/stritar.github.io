<?php
// Default CMS HTMLEditorConfig
HtmlEditorConfig::get('cms')->setOptions(array(
	'friendly_name' => 'Default CMS',
	'priority' => '50',

	'body_class' => 'typography',
	'document_base_url' => isset($_SERVER['HTTP_HOST']) ? Director::absoluteBaseURL() : null,

	'cleanup_callback' => "sapphiremce_cleanup",
	'remove_linebreaks' => true,

	'use_native_selects' => false,
	'valid_elements' => '*[*]'
));

HtmlEditorConfig::get('cms')->disablePlugins('contextmenu');

HtmlEditorConfig::get('cms')->enablePlugins('media', 'fullscreen', 'inlinepopups');
HtmlEditorConfig::get('cms')->enablePlugins(array(
	'ssbuttons' => sprintf('../../../%s/tinymce_ssbuttons/editor_plugin_src.js', THIRDPARTY_DIR)
));
HtmlEditorConfig::get('cms')->enablePlugins('advimagescale');
			
HtmlEditorConfig::get('cms')->insertButtonsBefore('formatselect', 'styleselect');
HtmlEditorConfig::get('cms')->addButtonsToLine(2, 
	'ssmedia', 'ssflash', 'sslink', 'unlink', 'anchor', 'separator','code', 'fullscreen', 'separator');
			
HtmlEditorConfig::get('cms')->removeButtons('tablecontrols');
HtmlEditorConfig::get('cms')->addButtonsToLine(3, 'tablecontrols');

CMSMenu::remove_menu_item('CMSProfileController');
