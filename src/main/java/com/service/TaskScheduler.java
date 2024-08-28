package com.service;

import java.util.Date;
import java.util.Timer;

public class TaskScheduler {

    public void start(int ItemNo, Date endDate) {
        Timer timer = new Timer();
        MyTask myTask = new MyTask(ItemNo);
        // Schedule the task to run every second (1000 milliseconds)
        //timer.scheduleAtFixedRate(myTask, 0, 1000);
        timer.schedule(myTask, endDate);
    }
}
