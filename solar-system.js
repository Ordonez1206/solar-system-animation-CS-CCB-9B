$(document).ready(function(){
    //BEGIN
    
    
    /*
        Fa un refresh della pagina ogni qualvolta la finestra 
        viene ridimensionata
    */
    $(window).resize(function() 
    {
        setTimeout(function()
        {
            window.location.reload(1);
        }, 20);
    });
    
    /************************************************************************************
        
        GLOBAL VARIABLES
    *************************************************************************************/
    
    var grad2rad = Math.PI / 180;
    var velSyst = 1; // speed of a planet
    var ellipseSim = 0.66; // trayectory 0.66 for ellipse or 1 for circle
    var aphelium = 45 // aphelion and pherihelium
    
    
    /************************************************************************************
        
        SUN GLOBAL VARIABLES
    *************************************************************************************/
    
    var sunPos = $('#sun').position(), //position
        sunRad = $('#sun').width() * 0.5, // radius
        cx = sunPos.left + sunRad, // coordinate X
        cy = sunPos.top + sunRad, // coordinate Y
        sunStyle = $('#sun').css("background-image: url(img/suntexture.jpeg)"); // color on css
    
    
    
    
    
    
    
    
    /************************************************************************************
        
        PLANET OBJECT CONSTRUCTOR
    *************************************************************************************/
    
    var Planet = function (name, radius, orbDist, speedIncr, col)
    {   
        this.Name = name; // Name of the planet, the same name of the DIV's Id attribute
        this.Radius = radius; // Radius of the planet
        this.Distance = orbDist; // Distance between sun and planet's surfaces
        this.startPos = 180; // Start Position angle
        this.Color = col; // Planet's Color 
    
    
        this.update = function()
        {
            this.startPos = (this.startPos + speedIncr * velSyst); 
    
            /*
               This conditional command is to prevent that
                in the long run the startPos can go beyond the limits
                internal coding.
            */
            
            if (this.startPos  > 360) this.startPos = this.startPos- 360;
            
    
            //R is the sum of the radius of the planet, the distance between the surface of the sun and the planet and the radius of the sun
            var R = (this.Radius + this.Distance + sunRad)
    
    
            /*
                I get the coordinates of the new location
                To simulate the elliptical trajectory multiply the function by "ellipseSim";
                to have the same effect, but vertically multiply ellipseSim by the cosine.
            */
    
            var alpha = this.startPos * grad2rad; // Angle in radius
    
            // Coordinate
            var x = cx + R * Math.cos(alpha);
            var y = cy + R * Math.sin(alpha);
            
    
            //I return a newPos object to have the coordinates of the new position separate
            return newPos = 
            {
                X: x, 
                Y: y        
            };
        }
    }
    
    
    
    /************************************************************************************
        
        Planet's Instances in an array planet
        //Planet(name, radius, orbDist, speedIncr, col)
        
            radius 
            average distance from the sun
            orbital velocity
    *************************************************************************************/

    var k = 0.5
    
    var planets = [
    
        mercury = new Planet("mercury", 3, 40, 0.474 * k, "background-image: url(img/mercury.jpeg)"),
    
        venus = new Planet("venus", 7.44, 80, 0.350 * k , "background-image: url(img/venus.jpeg)"),
        
        earth = new Planet("Earth", 7.84, 120, 0.298 * k, "background-image: url(img/earth.jpeg)"),
        
        mars = new Planet("Mars", 4.18, 160, 0.241 * k, "background-image: url(img/mars.jpeg)"),

        jupiter = new Planet("Jupiter", 87.92, 250, 0.131 * k, "background-image: url(img/jupiter.jpeg)"),
        
        saturn = new Planet("Saturn", 74.12,  500, 0.097 * k, "background-image: url(img/saturn.jpeg)"),

        uranus = new Planet("Uranus", 31.43, 750, 0.068 * k, "background-image: url(img/uranus.jpeg)") ,

        neptune = new Planet ("Neptune", 30.45, 900, 0.054 * k, "background-image: url(img/neptune.jpeg)") ,
    
    ];
    
    
    
    
    
    
    
    /************************************************************************************
        
        RENDER FUNCTION
    *************************************************************************************/
    
    function render() 
    {
        for(var i = 0; i<planets.length; i++)
        {
            //Coordinates of each planet
            var x = planets[i].update().X,
                y = planets[i].update().Y;
    
    
            //DIV element in the HTML file
            var planet = $("#"+planets[i].Name)
    
    
            planet.css(
            {
                width: planets[i].Radius * 2,
                height: planets[i].Radius * 2,
                left: x - planets[i].Radius, 
                top: y - planets[i].Radius,
                border: "1px solid " + planets[i].Color,
                "background-color": planets[i].Color
            });
        }
        requestAnimationFrame(render);
    }
    
    
    //Calling the render() function
    render();
    
    
    
    //END $(document).ready()
    
    });