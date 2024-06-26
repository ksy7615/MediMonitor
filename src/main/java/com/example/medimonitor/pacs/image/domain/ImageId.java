package com.example.medimonitor.pacs.image.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
@Getter
public class ImageId implements Serializable {

    private long studykey;
    private long serieskey;
    private long imagekey;
}
