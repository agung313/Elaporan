<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Absensi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class DailyQuote extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'quote:daily';
    protected $signature = 'inspire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $tanggal = Carbon::now()->toDateString();
        // Mendapatkan semua id_user yang ada di tabel absensi pada hari ini
        $absentUserIds = Absensi::whereDate('tanggal', Carbon::today())->pluck('id_user')->all();

        // Mendapatkan semua id_user dari tabel user
        $allUserIds = User::pluck('id')->all();

        // Menemukan id_user yang tidak hadir hari ini
        $absentTodayUserIds = array_diff($allUserIds, $absentUserIds);

        // Mengambil data user berdasarkan id_user yang tidak hadir hari ini
        $absentTodayUsers = User::whereIn('id', $absentTodayUserIds)->get();

        // dd($absentTodayUsers);
        if($absentTodayUsers != null){
            foreach ($absentTodayUsers as $key => $absen) {
                $absensi = new Absensi;
                $absensi->id_user = $absen->id;
                $absensi->status = 'tidak hadir';
                $absensi->keterangan_hadir = 'tidak absen';
                $absensi->tanggal = $tanggal;
                $absensi->save();
            }
        }

        return 0;
    }
}
