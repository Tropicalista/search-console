<!-- Create a header in the default WordPress 'wrap' container -->
<div class="wrap">

	<div>
    <h2>Search console</h2>
    <?php settings_errors(); ?>

	<?php $active_tab = isset( $_GET[ 'tab' ] ) ? $_GET[ 'tab' ] : 'display_options'; ?>

	<h2 class="nav-tab-wrapper">
	    <a href="?page=<?php echo $this->plugin_name; ?>-settings&tab=display_options" class="nav-tab <?php echo $active_tab == 'display_options' ? 'nav-tab-active' : ''; ?>"><?php _e('Settings', 'searchconsole'); ?></a>
	    <a href="?page=<?php echo $this->plugin_name; ?>-settings&tab=advanced" class="nav-tab <?php echo $active_tab == 'advanced' ? 'nav-tab-active' : ''; ?>"><?php _e('Advanced settings', 'searchconsole'); ?></a>
	</h2>
     
    <form method="post" action="options.php">

        <?php
	        if( $active_tab == 'display_options' ) {
	            settings_fields( $this->plugin_name . '-general' );
	            do_settings_sections( $this->plugin_name . '-general' );
	        } else {
	            settings_fields( $this->plugin_name . '-advanced' );
	            do_settings_sections( $this->plugin_name . '-advanced' );
	        } // end if/else
	         
	        submit_button();
        ?>
         
    </form>

    
    <?php 
    if($active_tab == 'advanced'){
    ?>
    <p>--OR--</p>
	    <form method="post" action="options.php">
	    	<?php
	            settings_fields( $this->plugin_name . 'reset' );
	            do_settings_sections( $this->plugin_name . 'reset' );
	        ?>
	        <input type="hidden" class="regular-text" 
            id="<?php echo $this->plugin_name; ?>reset-reset" 
            name="<?php echo $this->plugin_name; ?>reset[reset]" 
	        value="1" />
	        <?php submit_button('Reset', 'primary','submit', TRUE); ?>
	    </form> 
	<?php
    }
    ?>
	</div>
</div><!-- /.wrap -->