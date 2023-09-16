alert="";
status="";
objects=[];
function preload()
{
    alert=loadSound("alert.mp3");
}

function setup()
{
    canvas=createCanvas(600,600);
    canvas.position(1050,500);
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("object").innerHTML="Cocossd is detecting objects";
}

 

function modelLoaded()
{
  console.log("modelLoaded");
  status=true;
}

function gotResult(error,result)
{
   if(error)
   {
      console.log(error);
   }
   else
   {
      console.log(result);
      objects=result;
   }
}

function draw()
{
    image(video,0,0,600,600);
    if(status!="person")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length;i++)
        {
            alert.stop();
            document.getElementById("object").innerHTML="Baby Found";
            fill(r,g,b);
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height+140);
        
        }   
    }
    else
    {
        document.getElementById("object").innerHTML="Baby Not Found";
        alert.play();
    }
}

