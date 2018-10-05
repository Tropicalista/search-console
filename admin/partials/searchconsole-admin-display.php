<!-- Create a header in the default WordPress 'wrap' container -->
<div class="wrap">
<div id="poststuff">

    <div id="post-body" class="metabox-holder columns-2">

        <div id="post-body-content">


            <h1>Search Console</h1>
		    <?php settings_errors(); ?>

			<?php $active_tab = isset( $_GET[ 'tab' ] ) ? $_GET[ 'tab' ] : 'display_options'; ?>

			<h1 class="nav-tab-wrapper">
			    <a href="?page=<?php echo $this->plugin_name; ?>-settings&tab=display_options" class="nav-tab <?php echo $active_tab == 'display_options' ? 'nav-tab-active' : ''; ?>"><?php _e('Settings', 'searchconsole'); ?></a>
			    <a href="?page=<?php echo $this->plugin_name; ?>-settings&tab=advanced" class="nav-tab <?php echo $active_tab == 'advanced' ? 'nav-tab-active' : ''; ?>"><?php _e('Advanced settings', 'searchconsole'); ?></a>
			</h1>
		     
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
        
        <div id="postbox-container-1" class="postbox-container">
        <?php
            include_once( WP_PLUGIN_DIR . '/' . $this->plugin_name . '/admin/partials/searchconsole-ads.php' );
        ?>
        </div><!-- /#postbox-container-1 -->

    </div><!-- /#post-body -->

</div><!-- /.poststuff -->
</div><!-- /.wrap -->
