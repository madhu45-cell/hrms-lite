from rest_framework import generics
from .models import Attendance
from .serializers import AttendanceSerializer

class AttendanceListCreateView(generics.ListCreateAPIView):
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        employee_id = self.request.query_params.get('employee_id')
        queryset = Attendance.objects.all()

        if employee_id:
            queryset = queryset.filter(employee_id=employee_id)

        return queryset
