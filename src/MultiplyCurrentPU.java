public class MultiplyCurrentPU extends Thread implements PowerUp {
    private int factor;
    private Sprite sprite;
    private String name;

    public MultiplyCurrentPU(Sprite sprite) {
        factor = (int) (Math.random() * 2 + 1);
        this.sprite = sprite;
        name = "Multiply Current Points! x" + factor;
    }
    @Override
    public void appear() {
        return;
    }

    public void disappear() {
        return;
    }

    public void run() {
        sprite.setPoweredUp(true);
        sprite.multiplyPoints(factor);
        //display name for 10 sec
        sprite.setPoweredUp(false);
    }

}
