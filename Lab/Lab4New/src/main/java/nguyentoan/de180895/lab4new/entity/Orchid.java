package nguyentoan.de180895.lab4new.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class Orchid {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Long id;

    @Column(name = "orchid_name")
    private String orchidName;

//    @Column(name = "is_natural",columnDefinition = "bit default 0")
//    private boolean isNatural;

    @Column(name = "orchid_description")
    private String description;



    @Column(name = "is_Special",columnDefinition = "bit default 0")
    private boolean isSpectial;

    @Column(name = "image",columnDefinition = "NVARCHAR(MAX)")
    private String image;

    private double price;

    @ManyToOne
    @JoinColumn(name = "cate_id")
    private Category category;
}
