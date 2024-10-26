public class Background {
    private boolean moving;

    public Background() {
        moving = true;
    }

    public void nextAnimationState() {
        //Go to next animation state in loop
    }

    public void stopMoving() {
        //Happens when sprite is asleep
        moving = false;
    }

    public void setMoving(boolean moving) {
        this.moving = moving;
    }
}
