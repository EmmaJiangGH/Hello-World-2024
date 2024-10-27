public class BasicPointsPU extends Thread implements PowerUp {
    private int numPoints;
    private Sprite sprite;
    private String name;

    public void appear() {
        return;
        //this is a gui thing... idk how to this yet
    }

    public void disappear() {
        return;
        //also a gui thing
    }

    public BasicPointsPU(Sprite sprite) {
        this.sprite = sprite;
        this.numPoints = (int) (Math.random() * 10 + 1);
        this.name = "Add Points! +" + numPoints;
    }

    public void run() {
        sprite.setPoweredUp(true);
        sprite.addPoints(numPoints);
        //display name for 10 sec
        sprite.setPoweredUp(false);
        return;
        //Get current points of sprite
        //Update points of sprite (+=)
    }

}
