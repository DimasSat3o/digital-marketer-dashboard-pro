
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Save, Plus, Trash2 } from "lucide-react";

interface ReportAdsProps {
  selectedCafe: string;
  selectedMonth: number;
  selectedYear: number;
  cafes: Array<{ id: string; name: string }>;
}

interface AdData {
  platform: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  roas: number;
  budget: number;
}

export const ReportAds = ({
  selectedCafe,
  selectedMonth,
  selectedYear,
  cafes,
}: ReportAdsProps) => {
  const [adsData, setAdsData] = useState<AdData[]>([
    {
      platform: "Meta Ads",
      impressions: 15420,
      clicks: 324,
      ctr: 2.1,
      cpc: 2500,
      conversions: 12,
      roas: 3.2,
      budget: 1500000
    },
    {
      platform: "Google Ads",
      impressions: 22150,
      clicks: 445,
      ctr: 2.0,
      cpc: 2200,
      conversions: 18,
      roas: 4.1,
      budget: 2000000
    },
    {
      platform: "TikTok Ads",
      impressions: 8180,
      clicks: 123,
      ctr: 1.5,
      cpc: 1800,
      conversions: 4,
      roas: 2.8,
      budget: 800000
    }
  ]);

  const selectedCafeName = cafes.find(c => c.id === selectedCafe)?.name || "";
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const handleDataChange = (index: number, field: keyof AdData, value: string | number) => {
    const newData = [...adsData];
    newData[index] = { ...newData[index], [field]: value };
    setAdsData(newData);
  };

  const addNewAdPlatform = () => {
    setAdsData([...adsData, {
      platform: "",
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cpc: 0,
      conversions: 0,
      roas: 0,
      budget: 0
    }]);
  };

  const removeAdPlatform = (index: number) => {
    setAdsData(adsData.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    return adsData.reduce((totals, ad) => ({
      impressions: totals.impressions + ad.impressions,
      clicks: totals.clicks + ad.clicks,
      conversions: totals.conversions + ad.conversions,
      budget: totals.budget + ad.budget
    }), { impressions: 0, clicks: 0, conversions: 0, budget: 0 });
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Laporan Iklan</h3>
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
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="summary">Ringkasan</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          {/* Form Input untuk setiap platform */}
          {adsData.map((ad, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  {ad.platform || `Platform Iklan ${index + 1}`}
                </CardTitle>
                {adsData.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAdPlatform(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`platform-${index}`}>Platform</Label>
                    <Select 
                      value={ad.platform} 
                      onValueChange={(value) => handleDataChange(index, 'platform', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Meta Ads">Meta Ads (Facebook & Instagram)</SelectItem>
                        <SelectItem value="Google Ads">Google Ads</SelectItem>
                        <SelectItem value="TikTok Ads">TikTok Ads</SelectItem>
                        <SelectItem value="YouTube Ads">YouTube Ads</SelectItem>
                        <SelectItem value="LinkedIn Ads">LinkedIn Ads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`budget-${index}`}>Budget (Rp)</Label>
                    <Input
                      id={`budget-${index}`}
                      type="number"
                      value={ad.budget}
                      onChange={(e) => handleDataChange(index, 'budget', parseInt(e.target.value) || 0)}
                      placeholder="1000000"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`impressions-${index}`}>Impressions</Label>
                    <Input
                      id={`impressions-${index}`}
                      type="number"
                      value={ad.impressions}
                      onChange={(e) => handleDataChange(index, 'impressions', parseInt(e.target.value) || 0)}
                      placeholder="10000"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`clicks-${index}`}>Clicks</Label>
                    <Input
                      id={`clicks-${index}`}
                      type="number"
                      value={ad.clicks}
                      onChange={(e) => handleDataChange(index, 'clicks', parseInt(e.target.value) || 0)}
                      placeholder="200"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`ctr-${index}`}>CTR (%)</Label>
                    <Input
                      id={`ctr-${index}`}
                      type="number"
                      step="0.1"
                      value={ad.ctr}
                      onChange={(e) => handleDataChange(index, 'ctr', parseFloat(e.target.value) || 0)}
                      placeholder="2.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`cpc-${index}`}>CPC (Rp)</Label>
                    <Input
                      id={`cpc-${index}`}
                      type="number"
                      value={ad.cpc}
                      onChange={(e) => handleDataChange(index, 'cpc', parseInt(e.target.value) || 0)}
                      placeholder="2500"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`conversions-${index}`}>Conversions</Label>
                    <Input
                      id={`conversions-${index}`}
                      type="number"
                      value={ad.conversions}
                      onChange={(e) => handleDataChange(index, 'conversions', parseInt(e.target.value) || 0)}
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`roas-${index}`}>ROAS</Label>
                    <Input
                      id={`roas-${index}`}
                      type="number"
                      step="0.1"
                      value={ad.roas}
                      onChange={(e) => handleDataChange(index, 'roas', parseFloat(e.target.value) || 0)}
                      placeholder="3.2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button 
            onClick={addNewAdPlatform}
            variant="outline" 
            className="w-full flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Platform Iklan</span>
          </Button>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Laporan Iklan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totals.impressions.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Impressions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{totals.clicks.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Clicks</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{totals.conversions}</div>
                  <div className="text-sm text-gray-600">Total Conversions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">Rp {totals.budget.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Budget</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Platform</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Budget</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Impressions</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Clicks</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">CTR</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">CPC</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Conversions</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adsData.map((ad, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{ad.platform}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">Rp {ad.budget.toLocaleString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{ad.impressions.toLocaleString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{ad.clicks.toLocaleString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{ad.ctr}%</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">Rp {ad.cpc.toLocaleString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{ad.conversions}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{ad.roas}</td>
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
