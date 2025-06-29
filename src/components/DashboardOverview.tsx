
import { CheckCircle, XCircle, Download, Edit, Plus, TrendingUp, Eye, MousePointer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardOverviewProps {
  selectedCafe: string;
  selectedMonth: number;
  selectedYear: number;
  cafes: Array<{ id: string; name: string }>;
  onNavigate: (view: string) => void;
}

export const DashboardOverview = ({
  selectedCafe,
  selectedMonth,
  selectedYear,
  cafes,
  onNavigate,
}: DashboardOverviewProps) => {
  const selectedCafeName = cafes.find(c => c.id === selectedCafe)?.name || "";
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Mock data untuk demo
  const reportStatus = {
    ads: { completed: true, hasData: true },
    content: { completed: false, hasData: true }
  };

  const metrics = {
    totalImpressions: 45750,
    totalClicks: 892,
    totalConversions: 34,
    totalContent: 28
  };

  return (
    <div className="space-y-6">
      {/* Header dengan info periode */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Laporan {monthNames[selectedMonth - 1]} {selectedYear}</h3>
        <p className="text-blue-100">Kafe: {selectedCafeName}</p>
      </div>

      {/* Metrik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{metrics.totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+12.5% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{metrics.totalClicks.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+8.2% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Konversi</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{metrics.totalConversions}</div>
            <p className="text-xs text-orange-600 mt-1">CTR: 1.95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Konten</CardTitle>
            <Plus className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{metrics.totalContent}</div>
            <p className="text-xs text-purple-600 mt-1">Posts bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Laporan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Status Laporan Iklan</span>
              {reportStatus.ads.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <Badge variant={reportStatus.ads.completed ? "default" : "destructive"}>
                {reportStatus.ads.completed ? "Lengkap" : "Belum Lengkap"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Tersedia</span>
              <Badge variant={reportStatus.ads.hasData ? "secondary" : "outline"}>
                {reportStatus.ads.hasData ? "Ada" : "Tidak Ada"}
              </Badge>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button 
                onClick={() => onNavigate("ads")}
                variant="outline" 
                size="sm"
                className="flex items-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Laporan</span>
              </Button>
              
              {reportStatus.ads.completed && (
                <Button 
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Status Laporan Konten</span>
              {reportStatus.content.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <Badge variant={reportStatus.content.completed ? "default" : "destructive"}>
                {reportStatus.content.completed ? "Lengkap" : "Belum Lengkap"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Tersedia</span>
              <Badge variant={reportStatus.content.hasData ? "secondary" : "outline"}>
                {reportStatus.content.hasData ? "Ada" : "Tidak Ada"}
              </Badge>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button 
                onClick={() => onNavigate("content")}
                variant="outline" 
                size="sm"
                className="flex items-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Laporan</span>
              </Button>
              
              {reportStatus.content.completed && (
                <Button 
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => onNavigate("ads")}
              variant="outline" 
              className="flex items-center space-x-2 h-16"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Data Iklan</span>
            </Button>
            
            <Button 
              onClick={() => onNavigate("content")}
              variant="outline" 
              className="flex items-center space-x-2 h-16"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Konten Baru</span>
            </Button>
            
            <Button 
              onClick={() => onNavigate("cafes")}
              variant="outline" 
              className="flex items-center space-x-2 h-16"
            >
              <Plus className="w-5 h-5" />
              <span>Kelola Kafe</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
