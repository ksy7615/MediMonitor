package com.example.medimonitor.pacs.image.domain;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "V_IMAGETAB" , schema = "PACSPLUS")
public class Image {

    @EmbeddedId
    private ImageId id;

    private String path;
    private String fname;
}
