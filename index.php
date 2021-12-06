<?php
/**
 * Plugin Name: Number Verification Plugin
 */
 
function numberVerification_shortcode() {
 
 return '<div id="number_verification" ></div>';
}
 
add_shortcode('Number-Verification', 'numberVerification_shortcode');
 
function numberVerification_load_assets() {
 
 $react_app_js  = plugin_dir_url( __FILE__ ) . 'numberverificationapp/build/static/js/all_in_one_file.js';
    $react_app_css = plugin_dir_url( __FILE__ ) . 'numberverificationapp/build/static/css/all_in_one_file.css'; 
      
    // time stops stylesheet/js caching while in development, might want to remove later  
    $version = time(); 
    wp_enqueue_script( 'Number-Verification', $react_app_js, array(), $version, true );         
    wp_enqueue_style( 'Number-Verification', $react_app_css, array(), $version );
}
 
add_action( 'wp_enqueue_scripts', 'numberVerification_load_assets' );