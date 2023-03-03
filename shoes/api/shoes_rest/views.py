from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Shoe, BinVO
from common.json import ModelEncoder
import json


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
        "bin_number",
        "closet_name",
        "bin_size",

    ]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "id",
        "color",
        "manufactuer_name",
        "bin",
        "picture_url",
    ]

    def get_extra_data(self, o):
        return {"bin": o.bin.id}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "manufactuer_name",
        "color",
        "picture_url",
        "bin",
        "id",
    ]

    encoders = {

        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            bin = BinVO.objects.get(pk=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def shoe_detail(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
