package Home.cache;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching

public class cahemanger {
    CacheManager cacheManager()
    {return new ConcurrentMapCacheManager("groups");
    }

}
