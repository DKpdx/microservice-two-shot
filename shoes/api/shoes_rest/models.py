from django.db import models
from django.urls import reverse


# Create your models here.


class BinVO(models.Model):
    import_href = models.CharField(
        max_length=200, unique=True, null=True, blank=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.closet_name} - {self.bin_number}/{self.bin_size}"


class Shoe(models.Model):
    manufactuer_name = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=40)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )



