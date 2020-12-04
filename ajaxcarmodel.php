<?php
/**
 * Plugin Name:        Ajax Car Model
 * Plugin URI:        https://provinus.in
 * Description:       Get Car, make, model via ajax
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Ravi Bhushan Raiya, Sunita Raiya
 * Author URI:        https://provinus.in
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ajax-car-model
 * Domain Path:       /languages
 **/
/*
Ajax Car Model is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
Ajax Car Model is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with Ajax Car Model. If not, see https://provinus.in.
*/
if(!class_exists('AjaxCarModel')) :

  
    class AjaxCarModel {

        /** function/method
		* Usage: Get HSN from wpvl_car_hsn table
		* Arg: none
		* Return: json out of hsn table result
        */
        public static function getHsn(){
            global $wpdb;
            $table= 'wpvl_car_hsn';
            $sql = "select * from $table";
            $res = $wpdb->get_results( $sql );
            echo json_encode($res);
            die();  
        }
        /** function/method
		* Usage: Get TSN from wpvl_car_hsntsn table
		* Arg: none
		* Return: json out of HsnTsn table result
        */
        public static function getHsnTsn(){
            global $wpdb;
            $table= 'wpvl_car_hsntsn';
            $sql = "select * from $table";
            $res = $wpdb->get_results( $sql );
            echo json_encode($res);
            die();  
        }
        /** function/method
		* Usage: Get Make from wpvl_car_make table
		* Arg: none
		* Return: json out of Car Make table result
        */
        public static function getCarMake(){
            global $wpdb;
            $table= 'wpvl_car_make';
            $sql = "select * from $table";
            $res = $wpdb->get_results( $sql );
            echo json_encode($res);
            die();  
        }
        /** function/method
		* Usage: Get Model from wpvl_car_makemodell table
		* Arg: none
		* Return: json out of Model table result
        */
        public static function getCarMakeModell(){
            global $wpdb;
            $table= 'wpvl_car_modell';
            $sql = "select a.* from $table as a inner join wpvl_car_make as b on a.`Make ID`=b.`Make ID` where b.`Make Name`='".$_POST["make"]."'";
            $res = $wpdb->get_results($sql);
            echo json_encode($res);
            die();  
        }
        /** function/method
        * Usage: Get Car from wpvl_car_car  table
        * Arg: none
        * Return: json out of Model table result
        */
        public static function getCarMakeModellCar(){
            global $wpdb;
            $table= 'wpvl_car_car';
            $sql = "select a.* from $table as a inner join wpvl_car_modell as b on a.`Modell ID`=b.`Modell ID` where b.`Modell Name`='".$_POST["model"]."'";
            $res = $wpdb->get_results($sql);
            echo json_encode($res);
            die();  
        }
        /** function/method
        * Usage: Get egnine from wpvl_car_engine table
        * Arg: none
        * Return: json out of Model table result
        */
        public static function getCarMakeModellCarEngine(){
            global $wpdb;
            $table= 'wpvl_car_engine';
            $sql = "select a.* from $table as a inner join wpvl_car_car as b on a.`Car ID`=b.`Car ID` where b.`Car Name`='".$_POST["car"]."'";
            $res = $wpdb->get_results($sql);
            echo json_encode($res);
            die();  
        }
        /** function/method
		* Usage: this function is used to set script in header like ajax url etc
		* Arg: none
		* Return: none
        */
        public static function enqueue_ajax_model_header(){            
                echo '<script type="text/javascript">
                        var carModelAjax= "'.admin_url('admin-ajax.php').'";
                      </script>';
        }
        public static function enqueue_ajax_model_js(){
             wp_enqueue_style('ajax_script_css',plugin_dir_url( __FILE__ ) . '/assets/css/ajaxcar.css');
            wp_enqueue_script( 'ajax_script',  plugin_dir_url( __FILE__ ). '/assets/js/ajaxscript.js', array(), false, true  );
        }
    }
        // if(is_admin()):
        //     add_action('admin_init', array('AjaxCarModel', 'getCarMakeModell'));
        // endif;
        //enqueue head script in header on fronthand
        add_action('wp_head', array('AjaxCarModel', 'enqueue_ajax_model_header'));
        add_action('wp_enqueue_scripts', array('AjaxCarModel', 'enqueue_ajax_model_js'));    
        //set fronthand ajax action for HSN function
        add_action('wp_ajax_getHsn', array('AjaxCarModel', 'getHsn'));
        add_action('wp_ajax_nopriv_getHsn', array('AjaxCarModel', 'getHsn'));
        //set fronthand ajax action for HSNTSN function
         add_action('wp_ajax_getHsnTsn', array('AjaxCarModel', 'getHsnTsn'));
         add_action('wp_ajax_nopriv_getHsnTsn', array('AjaxCarModel', 'getHsnTsn'));
         //set fronthand ajax action for Car Make function
         add_action('wp_ajax_getCarMake', array('AjaxCarModel', 'getCarMake'));
         add_action('wp_ajax_nopriv_getCarMake', array('AjaxCarModel', 'getCarMake'));
         //set fronthand ajax action for Car Model function
         add_action('wp_ajax_getCarMakeModell', array('AjaxCarModel', 'getCarMakeModell'));
         add_action('wp_ajax_nopriv_getCarMakeModell', array('AjaxCarModel', 'getCarMakeModell'));
         //set fronthand ajax action for Car  function
         add_action('wp_ajax_getCarMakeModellCar', array('AjaxCarModel', 'getCarMakeModellCar'));
         add_action('wp_ajax_nopriv_getCarMakeModellCar', array('AjaxCarModel', 'getCarMakeModellCar'));
         //set fronthand ajax action for Car  function
         add_action('wp_ajax_getCarMakeModellCarEngine', array('AjaxCarModel', 'getCarMakeModellCarEngine'));
         add_action('wp_ajax_nopriv_getCarMakeModellCarEngine', array('AjaxCarModel', 'getCarMakeModellCarEngine'));
         
endif;