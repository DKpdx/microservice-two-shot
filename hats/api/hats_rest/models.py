from django.db import models



# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, blank=True, null=True, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField(blank=True, null=True)
    shelf_number = models.PositiveSmallIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.closet_name} {self.section_number} {self.shelf_number}"


class Hats(models.Model):
    fabric = models.CharField(max_length=50)
    style = models.CharField(max_length=120)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name= "hats",
        on_delete=models.CASCADE,
    )
