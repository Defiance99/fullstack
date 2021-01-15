<?php

    /**

     * Template Name: Афиши

     */

    get_header(); ?>



    <?php

        $bg = '';

        if ( ! function_exists('rwmb_meta') ) { 

            $bg = '';

        }else{

            $images = rwmb_meta('_cmb_bg_header', "type=image" ); 

            if(!$images){

                $bg = '';

            } else {

                foreach ( $images as $image ) { 

                    $bg = $image['full_url']; 

                    break;

                }

            }

        }

    

    ?>



    <?php if(buildpro_get_option('page_header')) { ?>

    <?php $img = buildpro_get_option( 'page_header_bg' ) ? buildpro_get_option( 'page_header_bg' ) : ''; ?>



    <?php $img_src = $bg ? $bg : $img; ?>

    <!-- subheader -->

        <!-- subheader close -->

    <?php } ?>



    <div class="container-fluid" style="background-image: url(https://myata-lounge.by/wp-content/uploads/2020/11/bg3.jpg?id=1100); width: 100%; height: 450px;">

        <div class="container " style="height: 100%;">

            <div class="row" style="height: 100%; display: flex !important; flex-direction: column; justify-content: center; align-items: center; margin-top: 40px;">

                <p style="text-align: center; font-size: 45px; color: #FFF; ">Афиша</p>

                <p style="font-size: 18px; color: #E8E8E8; margin-top: 40px; max-width: 650px;">Мы позаботимся о том, что бы Ваш вечер выходного или праздничного дня был насыщенным. <br>Только в Нашей кальянной вы сможете увидеть не только талантливых людей, мастеров STAND UP'a, но и музыкальные коллективы. <br>Бронируйте столики заранее! </p>

            </div>

        </div>

    </div>

        
    <!-- news posters -->
    <div class="container-fluid" style="background-color: #FFF; padding: 40px 0;">

    <div class="container" style="margin-top: 15px;">


                <h2 style="text-align: center;">Предстоящие мероприятия</h2>
                <div class="row single_padding_top  m-0">

                    <?php


                        if ( have_posts() ) : ?>



                    <?php

                            /* Start the Loop */
                            // The code below means order posts 
                            global $query_string; 
                            query_posts( $query_string . "&order=ASC" );
                            $countPosters = 0;

                            while (have_posts()) : the_post();
                            $date_afisha = get_post_meta( get_the_ID(), 'date-afisha', false );
                            date_default_timezone_set("Europe/Moscow");
                            $date_today = date("m/d/Y");
                            /* var_dump($date_afisha[0]);
                            var_dump($date_today); */
                            if (!$date_afisha[0] || !$date_today) {
                                continue;
                            }
                            /* Если вебинар сегодня или в будущем */
                            if ((strtotime($date_afisha[0]) <= strtotime($date_today))) {
                                continue;
                            }elseif ($countPosters > 5) {
                                break;
                            }else {
                                $countPosters++;
                            }
                                ?>
    

                    <div class="col-md-4 col-sm-6 m-0 p-0 team_item" style="margin-top: 15px; padding: 0;">

                        <a  class="poster-card" href="<?php echo get_permalink(); ?>">

                        

                        <div style="line-height:1; border-radius: 10px;" class="mt-5 title_hr poster-card__Global">

                            <div style="margin: 0 auto; width: 100%; max-width: 350px;font-weight: 900;text-align: center;font-size: 1.5rem; padding: 10px 15px">

                                <!-- <p style="font-size: 15px;">АФИША МЕРОПРИЯТИЙ</p> -->

                                <img  width="240px" height="340px" alt=" <?php the_title();?>" src="<?php echo get_the_post_thumbnail_url();?>">

                                <p style="font-size: 17px; color: #272727; margin-top: 5px;"><?php the_title();?> </p>

                                <div style="display: flex; flex-direction: column"><?php the_content(); ?></div>

                            

                                

                            </div>

                        </div>

                        </a>





                    </div>

                    <?php

                           

                                endwhile;
                                 //wp_pagination(); 
                                //the_posts_navigation();

                                else :

                                //get_template_part( 'template-parts/content', 'none' );

                                endif;?>
                </div>
                <?php echo buildpro_pagination(); ?>
            </div>

    </div>


    <!-- old posters -->
    <!-- <div class="container-fluid" style="background-color: #FFF; padding: 40px 0;">

    <div class="container" style="margin-top: 15px;">



                <div class="row single_padding_top  m-0">
                            
                    <h2 style="text-align: center;">Архив</h2>
                    <?php

                            
                        if ( have_posts() ) : ?>



                    <?php

                            
                            $counterArchivePosters = 0;

                            // The code below means order posts 


                            while (have_posts()) : the_post();
                            $date_afisha = get_post_meta( get_the_ID(), 'date-afisha', false );
                            date_default_timezone_set("Europe/Moscow");
                            $date_today = date("m/d/Y");

                            if (!$date_afisha[0] || !$date_today) {
                                continue;
                            }

                            if ( !$date_afisha[0] || (strtotime($date_afisha[0]) > strtotime($date_today))) {
                                continue;
                            }else {
                                $counterArchivePosters++;
                            }
                                ?>
    

                    <div class="col-md-4 col-sm-6 m-0 p-0 team_item" style="margin-top: 15px; padding: 0;">

                        <a  class="poster-card" href="<?php echo get_permalink(); ?>">

                        

                        <div style="line-height:1; border-radius: 10px;" class="mt-5 title_hr poster-card__Global">

                            <div style="margin: 0 auto; width: 100%; max-width: 350px;font-weight: 900;text-align: center;font-size: 1.5rem; padding: 10px 15px">


                                <img  width="240px" height="340px" alt=" <?php the_title();?>" src="<?php echo get_the_post_thumbnail_url();?>">

                                <p style="font-size: 17px; color: #272727; margin-top: 5px;"><?php the_title();?> </p>

                                <div style="display: flex; flex-direction: column"><?php the_content(); ?></div>

                            

                                

                            </div>

                        </div>

                        </a>





                    </div>

                    <?php

                           

                                endwhile;
                                 //wp_pagination(); 
                                //the_posts_navigation();

                                else :

                                //get_template_part( 'template-parts/content', 'none' );

                                endif;
                                
                                 
                                if ($counterArchivePosters > 9) {
                                    ?>
                                    <div style="display: flex; justify-content: center;"><a href="/archive-posters" class="button-more-posters">Больше афиш</a></div>
                                    <?php
                                }
                                ?>
                                
                </div>

            </div>

    </div>
 -->


    <?php get_footer(); ?>