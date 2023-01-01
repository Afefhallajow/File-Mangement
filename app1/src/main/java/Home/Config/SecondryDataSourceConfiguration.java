/**package Home.Config;
import javax.sql.DataSource;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "Home",
        entityManagerFactoryRef = "secondryEntityManagerFactory",
        transactionManagerRef = "secondryTransactionManager")


public class SecondryDataSourceConfiguration {

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.secondry")
    public DataSourceProperties secondryDataSourceProperties() {
        return new DataSourceProperties();
    }
    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.secondry.configuration")
    public DataSource secondryDataSource() {
        return secondryDataSourceProperties().initializeDataSourceBuilder()
                .type(HikariDataSource.class).build();
    }
    @Primary
    @Bean(name = "secondryEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean secondryEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(secondryDataSource())
                .packages( "")
                .build();
    }
    @Primary
    @Bean(name = "secondryTransactionManager")
    public PlatformTransactionManager secondryTransactionManager(
            final @Qualifier("secondryEntityManagerFactory") LocalContainerEntityManagerFactoryBean secondryEntityManagerFactory) {
        return new JpaTransactionManager(secondryEntityManagerFactory.getObject());
    }




}

**/