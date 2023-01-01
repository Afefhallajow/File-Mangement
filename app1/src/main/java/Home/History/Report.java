package Home.History;

import java.util.Date;

public class Report {
String user_name;
String  mydDate;
String TypeOfProcees;

    public Report() {
    }

    public Report(String user_name, String mydDate, String typeOfProcees) {
        this.user_name = user_name;
        this.mydDate = mydDate;
        TypeOfProcees = typeOfProcees;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getMydDate() {
        return mydDate;
    }

    public void setMydDate(Date mydDate) {
        this.mydDate = mydDate.toString();
    }

    public String getTypeOfProcees() {
        return TypeOfProcees;
    }

    public void setTypeOfProcees(String typeOfProcees) {
        TypeOfProcees = typeOfProcees;
    }
}
