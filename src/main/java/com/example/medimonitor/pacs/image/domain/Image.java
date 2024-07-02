package com.example.medimonitor.pacs.image.domain;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "IMAGETAB" , schema = "PACSPLUS")
public class Image {

    @EmbeddedId
    private ImageId id;

    private String path;
    private String fname;
    private String contenttime;
    private String window;
    private String lev;
    private String pixelrows;
    private String pixelcolumns;

}
