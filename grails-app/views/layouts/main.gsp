<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="Grails"/></title>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}"/>
    <link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon"/>
    <g:javascript library="application"/>
    <script type="text/javascript" src="${resource(dir: 'js', file: 'jquery-1.7.min.js')}"></script>
    <script type="text/javascript" src="${resource(dir: 'js', file: 'imageManipulation.jquery.js')}"></script>
    <g:layoutHead/>
</head>

<body>
<div id="wrap">
    <div id="header">
        <h1 id="logo">
          <img src="${resource(dir:'images',file:'images.jpeg')}" width="180px" height="115px">
        </h1>
        <ul class="menu">
            <li><a href="#">HOME</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">DEMO</a></li>
        </ul>
    </div>

    <div id="contentWrap">
        <g:layoutBody/>
    </div>

    <div id="footer">

    </div>
</div>

</body>
</html>