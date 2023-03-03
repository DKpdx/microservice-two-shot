from django.shortcuts import render
from .models import Hats, LocationVO
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
# Create your views here.


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]


class HatsListEncoder(ModelEncoder):
    model = Hats
    properties = [
        "fabric",
        "style",
        "color",
        "picture_url",
        "id",
    ]
    def get_extra_data(self, o):
        return {
            "location": o.location.closet_name
        }

class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "fabric",
        "style",
        "color",
        "picture_url",
        "id",
        "location",
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def hats_list(request):
    if request.method == "GET":
        hats = Hats.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder = HatsListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse({"error": "Location does not exist"}, status=404)

        hats= Hats.objects.create(**content)
        return JsonResponse(
            hats,
            encoder = HatsDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def hats_detail(request, pk):
    if request.method == "GET":
            hats = Hats.objects.get(id=pk)
            return JsonResponse(
                hats,
                encoder = HatsListEncoder,
                safe=False,
            )
    else:
        count, _ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
