
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Save, Plus, Trash2, Upload, Image as ImageIcon, Video } from "lucide-react";

interface ReportContentProps {
  selectedCafe: string;
  selectedMonth: number;
  selectedYear: number;
  cafes: Array<{ id: string; name: string }>;
}

interface ContentData {
  id: string;
  date: string;
  caption: string;
  platform: string;
  status: string;
  mediaType: string;
  mediaUrl?: string;
}

export const ReportContent = ({
  selectedCafe,
  selectedMonth,
  selectedYear,
  cafes,
}: ReportContentProps) => {
  const [contentData, setContentData] = useState<ContentData[]>([
    {
      id: "1",
      date: "2024-06-15",
      caption: "Promo kopi spesial hari ini! Nikmati kopi arabika terbaik dengan harga terjangkau. #KopiSpesial #PromoHariIni",
      platform: "Instagram",
      status: "Published",
      mediaType: "image",
      mediaUrl: "/placeholder.svg"
    },
    {
      id: "2", 
      date: "2024-06-18",
      caption: "Tutorial brewing kopi yang sempurna untuk pemula. Ikuti langkah-langkahnya di video ini! #TutorialKopi #BrewingTips",
      platform: "TikTok",
      status: "Published",
      mediaType: "video"
    },
    {
      id: "3",
      date: "2024-06-22",
      caption: "Suasana kafe yang nyaman untuk meeting atau ngopi santai. Yuk datang dan rasakan pengalaman berbeda! #KafeNyaman #MeetingSpace",
      platform: "Facebook",
      status: "Draft",
      mediaType: "image"
    }
  ]);

  const selectedCafeName = cafes.find(c => c.id === selectedCafe)?.name || "";
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const handleContentChange = (id: string, field: keyof ContentData, value: string) => {
    setContentData(contentData.map(content => 
      content.id === id ? { ...content, [field]: value } : content
    ));
  };

  const addNewContent = () => {
    const newId = (contentData.length + 1).toString();
    setContentData([...contentData, {
      id: newId,
      date: "",
      caption: "",
      platform: "",
      status: "Draft",
      mediaType: "image"
    }]);
  };

  const removeContent = (id: string) => {
    setContentData(contentData.filter(content => content.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-100 text-green-800">Dipublikasi</Badge>;
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Dijadwalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlatformStats = () => {
    const stats = contentData.reduce((acc, content) => {
      acc[content.platform] = (acc[content.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(stats).map(([platform, count]) => ({ platform, count }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Laporan Konten</h3>
          <p className="text-gray-600 mt-1">
            {selectedCafeName} - {monthNames[selectedMonth - 1]} {selectedYear}
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Simpan</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="input" className="space-y-6">
        <TabsList>
          <TabsTrigger value="input">Input Konten</TabsTrigger>
          <TabsTrigger value="summary">Ringkasan</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          {/* Form Input untuk setiap konten */}
          {contentData.map((content) => (
            <Card key={content.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>Konten #{content.id}</span>
                  {getStatusBadge(content.status)}
                </CardTitle>
                {contentData.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeContent(content.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`date-${content.id}`}>Tanggal Posting</Label>
                    <Input
                      id={`date-${content.id}`}
                      type="date"
                      value={content.date}
                      onChange={(e) => handleContentChange(content.id, 'date', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`platform-${content.id}`}>Platform</Label>
                    <Select 
                      value={content.platform} 
                      onValueChange={(value) => handleContentChange(content.id, 'platform', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`status-${content.id}`}>Status</Label>
                    <Select 
                      value={content.status} 
                      onValueChange={(value) => handleContentChange(content.id, 'status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Published">Dipublikasi</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Scheduled">Dijadwalkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor={`caption-${content.id}`}>Caption</Label>
                  <Textarea
                    id={`caption-${content.id}`}
                    placeholder="Tulis caption konten di sini..."
                    value={content.caption}
                    onChange={(e) => handleContentChange(content.id, 'caption', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`mediaType-${content.id}`}>Tipe Media</Label>
                    <Select 
                      value={content.mediaType} 
                      onValueChange={(value) => handleContentChange(content.id, 'mediaType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Gambar</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Upload Media</Label>
                    <Button variant="outline" className="w-full flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </Button>
                  </div>
                </div>

                {/* Preview Media */}
                {content.mediaUrl && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div className="mt-2 border rounded-lg p-4 bg-gray-50">
                      {content.mediaType === "image" ? (
                        <div className="flex items-center space-x-2">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">Gambar telah diupload</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Video className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">Video telah diupload</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <Button 
            onClick={addNewContent}
            variant="outline" 
            className="w-full flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Konten Baru</span>
          </Button>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Statistik Platform */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getPlatformStats().map(({ platform, count }) => (
                    <div key={platform} className="flex justify-between items-center">
                      <span className="text-gray-600">{platform}</span>
                      <Badge variant="secondary">{count} konten</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Total Konten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{contentData.length}</div>
                <p className="text-sm text-gray-600 mt-1">konten bulan ini</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Publikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Dipublikasi</span>
                    <span className="text-sm font-medium">
                      {contentData.filter(c => c.status === "Published").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Draft</span>
                    <span className="text-sm font-medium">
                      {contentData.filter(c => c.status === "Draft").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabel Konten */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Daftar Konten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Tanggal</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Platform</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Caption</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Media</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentData.map((content) => (
                      <tr key={content.id}>
                        <td className="border border-gray-300 px-4 py-2">{content.date}</td>
                        <td className="border border-gray-300 px-4 py-2">{content.platform}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="max-w-xs truncate" title={content.caption}>
                            {content.caption}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 capitalize">{content.mediaType}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          {getStatusBadge(content.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
