package com.cognizant.restfulservices.service;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.cognizant.restfulservices.model.Country;

@Service
public class CountryService {

    @SuppressWarnings("unchecked")
    public Country getCountry(String code) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        List<Country> countryList =
                (List<Country>) context.getBean("countryList");

        return countryList.stream()
                .filter(country ->
                        country.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);

    }

}