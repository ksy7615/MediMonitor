package com.example.medimonitor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.example.medimonitor.pacs",
        entityManagerFactoryRef = "pacsEntityManager",
        transactionManagerRef = "pacsTransactionManager"
)
@EnableTransactionManagement
class PacsDatasourceConfig {

    @Value("${spring.datasource.pacs.driver-class-name}")
    private String driverClassName;
    @Value("${spring.datasource.pacs.url}")
    private String url;
    @Value("${spring.datasource.pacs.username}")
    private String username;
    @Value("${spring.datasource.pacs.password}")
    private String password;

    @Bean(name = "pacsDatasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .driverClassName(driverClassName)
                .url(url)
                .username(username)
                .password(password)
                .build();
    }

    @Bean(name = "pacsEntityManager")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("com.example.medimonitor.pacs");
        factory.setDataSource(dataSource());

        return factory;
    }

    @Bean(name = "pacsTransactionManager")
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {

        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory);
        return txManager;
    }

}
