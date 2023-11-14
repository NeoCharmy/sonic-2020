pc.script.createLoadingScreen(function (app) 
{
    var showSplash = function() 
    {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id  = 'application-splash-wrapper';
        
        document.body.appendChild(wrapper);

        // splash
        var splash  = document.createElement('div');
        splash.id   = 'application-splash';
        
        wrapper.appendChild(splash);
 
        splash.style.display = 'block';
        
        var container = document.createElement('div');
        container.id  = 'progress-bar-container';
        
        splash.appendChild(container);

        var bar     = document.createElement('div');
        bar.id      = 'progress-bar';

        container.appendChild(bar);

    };

    var hideSplash = function() 
    {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild( splash );
        
        try {
           // sc.loadingComplete();
        } catch (e) {
            // no SDK loaded
        }
        
        try {
            FBInstant.startGameAsync().then(function(){});
        } catch (e) {
            // no SDK loaded
        }
    };

    var setProgress = function( value ) 
    {
        value = Math.min(1, Math.max(0, value));
        var bar = document.getElementById('progress-bar');
        
        if( bar ) bar.style.width = value * 100 + '%';
    
        try {
            sc.setLoadingProgress(value);
        } catch (e) {
        }
        
        try {
            FBInstant.setLoadingProgress( value*100 );
        } catch (e) {
        }
        
        
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #FFFFFF;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #FFFFFF;',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 50px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: #1d292c;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #f60;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();
        
    app.on('preload:end', function() 
    {
        app.off('preload:progress');
    });
    
    app.on('preload:progress', setProgress );
 
    app.once('postrender', hideSplash );
 
});