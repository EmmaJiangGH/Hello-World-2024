import java.util.concurrent.TimeUnit;

public class ChangeRatePU extends Thread implements PowerUp {
    private int newRate;
    private Sprite sprite;
    private String name;
    private int duration;
    private int remainingDuration;
    private boolean running = true;

    public ChangeRatePU(Sprite sprite) {
        newRate = (int) (Math.random() * 3 + 2);
        duration = (int) (Math.random() * 20 + 10);
        this.sprite = sprite;
        name = "Change Points Rate! x" + newRate;
        remainingDuration = duration;
    }
    public void appear() {
        return;
    }

    public void disappear() {
        return;
    }

    public void run() {
        //display name above sprite for duration
        sprite.setPoweredUp(duration);
        int originalRate = sprite.getRate();
        sprite.setRate(newRate);

        while (remainingDuration > 0 && running) {
            try {
                if (sprite.isAsleep()) {
                    synchronized (this) {
                        wait();
                    }
                } else {
                    TimeUnit.MINUTES.sleep(1);
                    remainingDuration--;
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                running = false;
            }
        }
        sprite.setRate(originalRate);
        sprite.setPoweredUp(false);
    }

    public void pausePowerUp() {
        running = false;
        notify();
    }

    public void resumePowerUp() {
        running = true;
        notify();
    }
}
