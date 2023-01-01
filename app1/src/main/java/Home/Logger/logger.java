package Home.Logger;

//import org.apache.logging.log4j.Logger;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Aspect
@Component
public class logger {
 Logger log=  LoggerFactory.getLogger(logger.class);
    @Pointcut(value = " execution(* Home.Files.*.*(..))")
    public void Mypointcut()
    {

    }
    @Pointcut(value = " execution(* Home.Group.GroupController.*(..))")

    public void Mypointcut2()
    {

    }

   @Around("Mypointcut()" )
   public Object applicationlogger(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
       Instant start=Instant.now();
       ObjectMapper  mapper=new ObjectMapper();
       String MethodName=proceedingJoinPoint.getSignature().getName();
       String ClassName=proceedingJoinPoint.getClass().toString();
       Object[] array=proceedingJoinPoint.getArgs();
     //  log.info("method"+ClassName+":"+MethodName+"()"+"arguments:"+mapper.writeValueAsString(array));
       Object object=proceedingJoinPoint.proceed();
       log.info(ClassName+":"+MethodName+"()"+"Response:"+mapper.writeValueAsString(object));
       Instant finish=Instant.now();
       long timeplased= Duration.between(start,finish).toMillis();
       log.info(("Time taken ="+new SimpleDateFormat("mm:ss:SSS").format(new Date(timeplased))));
       return object;}


    @AfterThrowing(pointcut = "Mypointcut()",throwing = "e")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable e)
    {
        log.error("Excepition in {}.with case {}. with message {}",joinPoint.getSignature().getDeclaringTypeName(),joinPoint.getSignature().getName(),e.getCause() !=null
                        ? e.getCause() : "null",
                e.getMessage() != null ? e.getMessage() :null);

    }


}
