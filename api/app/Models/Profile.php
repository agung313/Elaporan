<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Profile extends Model
{
    use HasFactory,LogsActivity;

    protected $guarded = ['id'];

    protected static $logAttributes = ['*'];
    protected static $ignoreChangedAttributes = ['created_at'];
    protected static $recordEvents = ['created', 'updated','deleted'];
    protected static $logOnlyDirty=true;


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['*'])->useLogName('profile');
    }            

    protected $casts = [
        'ruang_lingkup' => 'array',
    ];

}
