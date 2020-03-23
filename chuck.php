<?php
/**
 * Plugin Name: Chuck-Block
 * Description: Creates a custom made Gutenberg block for media / text combintations
 * Author: Sabrina Rosmann
 * Version: 1.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the block's assets for the editor
*/
function register_assets_chuck() {
    $heading_js = './extended-heading.js';
    wp_enqueue_script(
        'heading-js',
        plugins_url($heading_js, __FILE__),
        array('wp-element', 'wp-hooks', 'wp-block-editor', 'wp-components'),
        filemtime(plugin_dir_path( $heading_js, __FILE__))
    );
    
    /* SCRIPTS */
    $arnold_js = './arnold.js';
    wp_register_script(
        'arnold-js',
        plugins_url($arnold_js, __FILE__),
        array('wp-blocks', 'wp-element', 'wp-block-editor'),
        filemtime(plugin_dir_path( $arnold_js, __FILE__ ))
    );
    register_block_type( 
        'rosa/arnold', 
        array(
            'editor_script' => 'arnold-js',
            'render_callback' => 'render_callback_arnold'
        ) 
    );

    $sylvester_js = './sylvester.js';
    wp_register_script(
        'sylvester-js',
        plugins_url($sylvester_js, __FILE__),
        array('wp-blocks', 'wp-element', 'wp-block-editor'),
        filemtime(plugin_dir_path( $sylvester_js, __FILE__ ))
    );
    register_block_type( 
        'rosa/sylvester', 
        array(
            'editor_script' => 'sylvester-js',
            'render_callback' => 'render_callback_sylvester'
        )
    );

    $chuck_js = './chuck.js';
    wp_register_script(
        'chuck-js',
        plugins_url($chuck_js, __FILE__),
        array('wp-blocks', 'wp-element', 'wp-block-editor'),
        filemtime(plugin_dir_path( $chuck_js, __FILE__ ))
    );
    register_block_type( 
        'rosa/chuck', 
        array(
            'editor_script' => 'chuck-js',
            'render_callback' => 'render_callback_chuck'
        ) 
    );

    /* STYLES */
    enqueue_styles_chuck();
}

function enqueue_styles_chuck() {
    $block_css = './chuck.css';
    wp_enqueue_style( 
        'chuck-css', 
        plugins_url($block_css, __FILE__), 
        array(), 
        filemtime(plugin_dir_path($block_css, __FILE__))
    );
}

function render_callback_arnold($attributes, $innerblocks) {
    return '<div class="block__media">' .$innerblocks . '</div>';
}

function render_callback_sylvester($attributes, $innerblocks) {
    return '<div class="block__content">' .$innerblocks . '</div>';
}

function render_callback_chuck($attributes, $innerblocks) {
    return '<div class="block">' .$innerblocks . '</div>';
}


add_action( 'init', 'register_assets_chuck' );
add_action( 'enqueue_block_editor_assets', 'enqueue_styles_chuck' ); // if style is only for backend (Source: https://stackoverflow.com/questions/54560358/gutenberg-block-not-loading-my-styles-to-the-front-end-of-my-site)
//add_action( 'enqueue_block_assets', 'chuck_block_backend_enqueue' );
//add_action( 'enqueue_block_editor_assets', 'chuck_block_backend_enqueue' ); // if style is only for backend (Source: https://stackoverflow.com/questions/54560358/gutenberg-block-not-loading-my-styles-to-the-front-end-of-my-site)

?>