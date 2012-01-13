<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head><title>
    Image Manipulation
</title>
    <meta content="main" name="layout">
    <script type="text/javascript">
        $(document).ready(function() {
            $("#blur").imageManipulation({
                canvasHeight:100,
                canvasWidth:100
            });
        })
    </script>
</head>

<body>
<div id="main">
    <img src="${resource(dir: 'images', file: 'Apple.jpeg')}" id="blur" alt="img"/>

    <div id="inverted">

    </div>
</div>

<div id="rightbar"></div>

</body>
</html>