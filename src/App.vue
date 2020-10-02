<template>
<!DOCTYPE html>
    <html>
        <head>
            <link href='http://fonts.googleapis.com/css?family=Oleo+Script' rel='stylesheet' type='text/css'>
    
            <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet"> 
            
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        </head>
        <body>
            <div id="app">
                <menu-bar></menu-bar>
                <router-view/>
            </div>
        </body>
    </html>
</template>

<script>

import MenuBar from './components/MenuBar'

export default {
    name: 'app',
    components: {
        MenuBar
    }
}
</script>