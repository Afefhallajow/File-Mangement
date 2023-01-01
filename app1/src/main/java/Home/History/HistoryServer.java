package Home.History;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class HistoryServer {
@Autowired
    HistoryRepo historyRepo;

public void AddNewHistory(int file_id,String type)
{History history=new History();
if(type.equals("read"))
{
    history.checkinDate=new Date();
}
    if(type.equals("edit"))
    {        history.checkoutDate=new Date();

        history.EditeDate =new Date();}
    if(type.equals("checkout"))
    {
        history.checkoutDate=new Date();
    }
    if(type.equals("upload"))
    {history.uploadDate=new Date();}
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    String name = auth.getName();
history.setFile_id(file_id);
history.setUsername(name);
    historyRepo.save(history);
}
public ArrayList<Report> getReport(int fileid)
{ArrayList<Report> histories=new ArrayList<>();
    List<History> historyList=historyRepo.findAll();
    if(!historyList.isEmpty())
    {
        for (int i=0;i<historyList.size();i++)
        {if(historyList.get(i).getFile_id()==fileid)
        {Report report=new Report();
        if(historyList.get(i).getCheckoutDate()!= null)
        {
            report.setMydDate(historyList.get(i).getCheckoutDate());
        report.setTypeOfProcees("checkout");
        }
            if(historyList.get(i).getCheckinDate()!= null)
            {
                report.setMydDate(historyList.get(i).getCheckinDate());
                report.setTypeOfProcees("checkin");
            }
            if(historyList.get(i).getEditeDate()!= null)
            {
                report.setMydDate(historyList.get(i).getEditeDate());
                report.setTypeOfProcees("Edite");
            }
            if(historyList.get(i).getUploadDate()!= null)
            {
                report.setMydDate(historyList.get(i).getUploadDate());
                report.setTypeOfProcees("upload");
            }
report.setUser_name(historyList.get(i).getUsername());

            histories.add(report);

        }

        }

    }
    return histories;
}
}
