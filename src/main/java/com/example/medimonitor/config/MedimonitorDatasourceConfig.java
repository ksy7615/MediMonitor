package com.example.medimonitor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.example.medimonitor.test",
        entityManagerFactoryRef = "medimonitorEntityManager",
        transactionManagerRef = "medimonitorTransactionManager"
)
@EnableTransactionManagement
class PacsDatasourceConfig {

    @Value("${spring.datasource.medimonitor.driver-class-name}")
    private String driverClassName;
    @Value("${spring.datasource.medimonitor.url}")
    private String url;
    @Value("${spring.datasource.medimonitor.username}")
    private String username;
    @Value("${spring.datasource.medimonitor.password}")
    private String password;


    @Bean(name = "medimonitorDatasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .driverClassName(driverClassName)
                .url(url)
                .username(username)
                .password(password)
                .build();
    }

    @Bean(name = "medimonitorEntityManager")
    public LocalContainerEntityManagerFactoryBean entityaManagerFactory() {

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("com.example.medimonitor.test");
        factory.setDataSource(dataSource());
        return factory;
    }

    @Bean(name = "medimonitorTransactionManager")
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {

        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory);
        return txManager;
    }
}
