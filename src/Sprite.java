import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class Sprite {
    private static boolean asleep;
    private AtomicInteger currentPoints = new AtomicInteger(0);
    private static boolean poweredUp;
    private static int pointsPerFiveMin; //editable by certain power-up
    private ScheduledExecutorService timer = Executors.newScheduledThreadPool(1);

    public Sprite() {
        asleep = false;
        poweredUp = false;
        pointsPerFiveMin = 1;
        startIncrementing(pointsPerFiveMin);
    }

    public int getRate() {
        return pointsPerFiveMin;
    }
    public void setRate(int rate) {
        pointsPerFiveMin = rate;
    }

    public AtomicInteger getCurrentPoints() {
        return currentPoints;
    }

    private void startIncrementing(int rate) {
        timer.scheduleAtFixedRate(() -> {
            if (!asleep) { //Timed incrementing won't happen when asleep.
                addPoints(rate);
            }
        }, 5, 5, TimeUnit.MINUTES);
    }
    public void addPoints(int points) {
        currentPoints.addAndGet(points);
    }

    public void multiplyPoints(double multiplier) {
        currentPoints.set((int) (currentPoints.get() * multiplier));
    }

    public boolean isAsleep() {
        return asleep;
    }

    public void setAsleep() {
        asleep = true;
        //When timer is paused
        //Sprite needs to enter sleep animation
        //Powerup duration will not decrement while asleep (implement in powerup interface?)
    }

    public void wakeUp() {
        asleep = false;
        synchronized (this) {
            this.notifyAll();
        }
    }

    public void setPoweredUp(boolean poweredUp) {
        Sprite.poweredUp = poweredUp;
        //sprite needs to perform poweredup animation
    }

    public void setPoweredUp(int duration) {
        poweredUp = true;
        //powered up animation
        //lasting enhanced visual until duration over
            //poweredUp = false;
            //return to normal visual after duration over
    }

    public void taskCompleted() {
        this.addPoints(3);
    }

    public void walk() {
        //walk animation
    }

    //stop method


}
