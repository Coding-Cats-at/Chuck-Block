<?php

/**
 * Plugin Name: Chuck-Block
 * Description: Creates a custom made Gutenberg block with different styles
 * Author: Sabrina Rosmann
 * Version: 1.0.0
 */

 // Exit if accessed directly
 if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue the block's assests for the editor.
 */

function chuck_block_backend_enqueue() {
   // Scripts
   $block_js = './block.js';
   wp_enqueue_script( 
       'chuck-block-js', 
       plugins_url($block_js, __FILE__), 
       array('wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n', 'wp-components'),
       filemtime(plugin_dir_path( $block_js, __FILE__ ))
   );

   // Styles
   $block_css = './block.css';
   wp_enqueue_style( 
       'chuck-block-css', 
       plugins_url($block_css, __FILE__), 
       array(),
       filemtime(plugin_dir_path( $block_css, __FILE__ ))
   );
}
add_action( 'enqueue_block_assets', 'chuck_block_backend_enqueue' );
//add_action( 'enqueue_block_editor_assets', 'chuck_block_backend_enqueue' ); // if style is only for backend (Source: https://stackoverflow.com/questions/54560358/gutenberg-block-not-loading-my-styles-to-the-front-end-of-my-site)
?>